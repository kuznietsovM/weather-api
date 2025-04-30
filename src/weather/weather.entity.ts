import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Weather {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({type: 'jsonb'})
  data: any
}