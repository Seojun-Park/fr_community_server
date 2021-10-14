import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { BoardReturn, BoardsReturn } from './dto/board-return.dto';
import { Board } from './entity/board.entity';

@Resolver((of) => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query((returns) => BoardReturn)
  async getBoard(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<BoardReturn> {
    const res = await this.boardService.getBoard(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => BoardsReturn)
  async getBoards(): Promise<BoardsReturn> {
    const res = await this.boardService.getBoards();
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
