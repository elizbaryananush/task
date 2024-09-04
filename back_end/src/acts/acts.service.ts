import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ActsDto } from './dto/acts.dto';

@Injectable()
export class ActsService {
    constructor(private prisma: PrismaService) { }

    getAllTasks(user_id: string) {
        return this.prisma.act.findMany({
            where: {
                user_id,
            },
        });
    }

    getById(id: string) {
        return this.prisma.act.findUnique({
            where: {
                id
            }
        })
    }

    getByUserId(user_id: string) {
        return this.prisma.act.findMany({
            where: {
                user_id,
            },
        });
    }

    async create(user_id: string, dto: ActsDto) {

        return this.prisma.act.create({
            data: {
                description: dto.description,
                header: dto.header,
                user: {
                    connect: {
                        id: user_id
                    }
                }
            },
        });
    }

    async update(dto: Partial<ActsDto>, id: string, user_id: string) {
        return this.prisma.act.update({
            where: {
                user_id,
                id
            },
            data: {
                ...dto
            }
        })
    }

    async delete(id: string) {
        const user = this.prisma.act.delete({
            where: {
                id
            }
        })

        return { massage: 'Deleted Successfully' }
    }
}

