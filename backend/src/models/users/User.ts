import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcrypt from 'bcrypt';

@Entity({
    database: 'users',
    name: 'users'
})

export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    registration: string;

    @Column()
    image: string;

    @Column()
    password: string;

    @Column()
    role: string;
    
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}