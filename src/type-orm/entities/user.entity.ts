import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class ORMUser {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column("varchar")
    name: string;

  @Column("varchar")
    email: string;

  @Column("varchar")
    passwordHash: string;

  @Column("date")
    createdAt: Date;
}
