import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getBoard(id: number): Promise<Board | string> {
    try {
      const res = await this.boardRepository.findOne({ where: { id } });
      if (!res) return 'no user found';
      return res;
    } catch (err) {
      return err.message;
    }
  }

  async getBoards(): Promise<Board[] | string> {
    try {
      const boards: Board[] | undefined = await this.boardRepository.find({
        order: { createdAt: 'DESC' },
      });
      if (!boards) return 'Fail to request board list';
      if (boards.length === 0) return 'no boards';
      return boards;
    } catch (err) {
      return err.message;
    }
  }
}
