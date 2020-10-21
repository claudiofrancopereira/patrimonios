import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Patrimonio from './Patrimonio';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Patrimonio, patrimonio => patrimonio.images)
    @JoinColumn({ name: 'patrimonio_id' })
    patrimonio: Patrimonio;

}