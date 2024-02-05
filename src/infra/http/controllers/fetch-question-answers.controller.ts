import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { QuestionPresenter } from "../presenters/question-presenter";
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/use-cases/fetch-question-answers";
import { AnswerPresenter } from "../presenters/answer-presenter";

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller("/questions/:questionId/answers")
export class FetchQuestionAnswersController {
  constructor(private fetchQuestionAnswers: FetchQuestionAnswersUseCase) {}

  @Get()
  @UsePipes(new ZodValidationPipe(pageQueryParamSchema))
  async handle(
    @Query("page") page: PageQueryParamSchema,
    @Param("questionId") questionId: string
  ) {
    const result = await this.fetchQuestionAnswers.execute({
      page,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const answers = result.value.answers;

    return { answers: answers.map(AnswerPresenter.toHTTP) };
  }
}
