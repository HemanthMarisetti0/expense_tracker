import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiResponse({ status: 201, description: 'Expense created successfully' })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    const expense = await this.expenseService.create(createExpenseDto);

    return {
      success: true,
      message: 'Expense created successfully',
      data: expense,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses for a user' })
  @ApiResponse({ status: 200, description: 'Expenses fetched' })
  async findAll(@Query('userId') userId: string) {
    if (!userId) {
      return {
        success: false,
        message: 'userId query parameter is required',
        data: [],
      };
    }

    const expenses = await this.expenseService.findAll(userId);

    return {
      success: true,
      message: 'Expenses fetched successfully',
      data: expenses,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single expense by ID' })
  @ApiResponse({ status: 200, description: 'Expense fetched successfully' })
  async findOne(@Param('id') id: string) {
    const expense = await this.expenseService.findOne(id);
    return {
      success: true,
      message: 'Expense fetched successfully',
      data: expense,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense by ID' })
  @ApiResponse({ status: 200, description: 'Expense updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    const expense = await this.expenseService.update(id, updateExpenseDto);
    return {
      success: true,
      message: 'Expense updated successfully',
      data: expense,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense by ID' })
  @ApiResponse({ status: 200, description: 'Expense deleted successfully' })
  async remove(@Param('id') id: string) {
    const expense = await this.expenseService.remove(id);
    return {
      success: true,
      message: 'Expense deleted successfully',
      data: expense,
    };
  }
}
