import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { BoardReturn, BoardsReturn } from './dto/board-return.dto';
import { CreateBoardInput } from './dto/create-board.input';
import { EditBoardInput } from './dto/edit-board.input';
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

  @Mutation((returns) => BoardReturn)
  async createBoard(
    @Args('args', { type: () => CreateBoardInput }) args: CreateBoardInput,
  ): Promise<BoardReturn> {
    const res = await this.boardService.createBoard(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => BoardReturn)
  async editBoard(
    @Args('args', { type: () => EditBoardInput }) args: EditBoardInput,
  ): Promise<BoardReturn> {
    const res = await this.boardService.editBoard(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => BoardReturn)
  async deleteBoard(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean | string> {
    return await this.boardService.deleteBoard(id);
  }
}
