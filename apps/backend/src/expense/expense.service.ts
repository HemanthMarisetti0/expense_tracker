import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        amount: new Prisma.Decimal(dto.amount),
        description: dto.description,
        date: dto.date ? new Date(dto.date) : undefined,
        user: {
          connect: { id: dto.userId },
        },
        category: dto.categoryId
          ? { connect: { id: dto.categoryId } }
          : undefined,
        paymentMethod: dto.paymentMethodId
          ? { connect: { id: dto.paymentMethodId } }
          : undefined,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: {
        userId: userId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.expense
      .findUnique({
        where: { id },
        include: {
          user: true,
          category: true,
          paymentMethod: true,
        },
      })
      .then((expense) => {
        if (!expense) {
          throw new NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
      });
  }

  async update(id: string, dto: UpdateExpenseDto) {
    const existingExpense = await this.prisma.expense.findUnique({
      where: { id },
    });
    if (!existingExpense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    return this.prisma.expense.update({
      where: { id },
      data: {
        amount:
          dto.amount !== undefined ? new Prisma.Decimal(dto.amount) : undefined,
        description: dto.description,
        date: dto.date ? new Date(dto.date) : undefined,
        category: dto.categoryId
          ? { connect: { id: dto.categoryId } }
          : undefined,
        paymentMethod: dto.paymentMethodId
          ? { connect: { id: dto.paymentMethodId } }
          : undefined,
      },
    });
  }

  async remove(id: string) {
    const existingExpense = await this.prisma.expense.findUnique({
      where: { id },
    });
    if (!existingExpense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
