import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    getById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                acts: true
            }
        })
    }

    getByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: {
                username: username
            },
            include: {
                acts: true
            }
        })
    }

    async getProfile(id: string) {
        const { password, ...result } = await this.getById(id)

        const totalActs = result.acts.length;

        return {
            user: result,
            total_acts: totalActs
        }
    }

    async create(dto: AuthDto) {
        const user = {
            username: dto.username,
            name: dto.name,
            password: await hash(dto.password)
        }

        return this.prisma.user.create({
            data: user
        })
    }

    async update(id: string, dto: UserDto) {
        let data = dto

        if (dto.username) {
            const oldUser = await this.prisma.user.findUnique({
                where: {
                    username: dto.username,
                }
            })

            if (oldUser) throw new UnauthorizedException('User with this username already exists')
        }

        if (dto.password) {
            data = { ...dto, password: await hash(dto.password) }
        }

        return this.prisma.user.update({
            where: {
                id,
            },
            data,
            select: {
                id: true,
                name: true,
                username: true
            }
        })
    }

    async delete(id: string) {
        const user = await this.prisma.user.delete({
            where: {
                id
            }
        })

        return { massage: 'Deleted successfully' }
    }
}
