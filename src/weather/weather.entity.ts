import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Weather {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column({type: 'jsonb'})
  data: any
}