import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ConnectionService {
    //Following Is YOU remember it please

    //hetevoxy followerid na um vor hetebum en following
    constructor(private prisma: PrismaService,
        private userService: UserService
    ) { }

    async getAllFollowers(id: string) { //people who follow me
        const connections = await this.prisma.connection.findMany({
            where: {
                followingId: id
            }
        })

        const followerIds = connections.map(conn => conn.followingId);

        const users = await this.prisma.user.findMany({
            where: {
                id: {
                    in: followerIds
                },
            },
            select: {
                username: true
            }
        });

        return users;
    }

    async getAllFollowings(id: string) { //people who i follow
        const connections = await this.prisma.connection.findMany({
            where: {
                followerId: id
            }
        })

        // return connections

        const followingIds = connections.map(conn => conn.followingId);

        const users = await this.prisma.user.findMany({
            where: {
                id: {
                    in: followingIds
                },
            },
            select: {
                username: true
            }
        });



        return users;
    }

    async follow(id: string, followingId: string) {

        return this.prisma.connection.create({
            data: {
                followerId: id,
                followingId: followingId
            }
        })
    }

    async unfollow(id: string, followerId: string) {
        const oldConnection = await this.prisma.connection.delete({
            where: {
                followingId_followerId: {
                    followerId: id,
                    followingId: followerId
                }
            }
        });

        // Return a success message
        return {
            message: 'Deleted successfully'
        };
    }
}
