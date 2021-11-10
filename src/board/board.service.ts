import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../image/entity/image.entity';
import { User } from '../user/entity/user.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { EditBoardInput } from './dto/edit-board.input';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async getBoard(id: number): Promise<Board | string> {
    try {
      const res = await this.boardRepository.findOne({
        where: { id },
        relations: ['Writer', 'Replies', 'Replies.User'],
      });
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

  async createBoard(args: CreateBoardInput): Promise<Board | string> {
    try {
      const { UserId, title, content, category, images } = args;
      const writer: User | undefined = await this.userRepository.findOne({
        where: { id: UserId },
      });
      if (!writer) return 'Fail to find the user';
      const board = new Board();
      board.WriterId = writer.id;
      board.title = title;
      board.content = content;
      board.category = category;
      const savedBoard = await this.boardRepository.save(board);
      if (images) {
        for (let i = 0; i < images.length; i++) {
          const newImage = new Image();
          newImage.url = images[i];
          newImage.BoardId = savedBoard.id;
          await this.imageRepository.save(newImage);
        }
      }
      return savedBoard;
    } catch (err) {
      return err.message;
    }
  }

  async editBoard(args: EditBoardInput): Promise<Board | string> {
    try {
      const { boardId, title, content } = args;
      const board: Board | undefined = await this.boardRepository.findOne({
        where: { id: boardId },
      });
      if (!board) return 'No board found';
      const prevValue: {
        title: string;
        content: string;
      } = {
        title: board.title,
        content: content,
      };
      board.title = title || prevValue.title;
      board.content = content || prevValue.content;
      await this.boardRepository.save(board);
      return board;
    } catch (err) {
      return err.message;
    }
  }

  async deleteBoard(id: number): Promise<boolean | string> {
    try {
      await this.boardRepository.delete({ id });
      return true;
    } catch (err) {
      return err.message;
    }
  }
}
