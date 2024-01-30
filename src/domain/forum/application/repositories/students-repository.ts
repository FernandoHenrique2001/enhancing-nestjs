import { Question } from "@/domain/forum/enterprise/entities/question";
import { Student } from "../../enterprise/entities/student";

export abstract class StudentsRepository {
  abstract findByEmail(email: string): Promise<Student | null>;

  abstract create(question: Student): Promise<void>;
}
