import {AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import bcrypt from "bcrypt";

@Entity('users')

export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

}
