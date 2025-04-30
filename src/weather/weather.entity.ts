import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Weather {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({type: 'jsonb'})
  // I consider this field as any because I store it as a JSON
  data: any
}