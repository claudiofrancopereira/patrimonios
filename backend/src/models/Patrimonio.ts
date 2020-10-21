import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('patrimonios')
export default class Patrimonio {
    @PrimaryGeneratedColumn('increment')
    id: number;

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

}