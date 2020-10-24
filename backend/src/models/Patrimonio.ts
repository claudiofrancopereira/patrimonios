import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image';

@Entity('patrimonios')
export default class Patrimonio {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column()
    address: string;
    
    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    notes: string;

    @OneToMany(() => Image, image => image.patrimonio, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'patrimonio_id' })
    images: Image[];
}