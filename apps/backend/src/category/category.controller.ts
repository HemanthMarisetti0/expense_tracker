import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created' })
  async create(@Body() dto: CreateCategoryDto) {
    const category = await this.categoryService.create(dto);

    return {
      success: true,
      message: 'Category created successfully',
      data: category,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories for a user' })
  @ApiResponse({ status: 200, description: 'Categories fetched' })
  async findAllByUser(@Param('userId') userId: string) {
    const categories = await this.categoryService.findAll(userId);

    return {
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({ status: 200, description: 'Category fetched' })
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);

    return {
      success: true,
      message: 'Category fetched successfully',
      data: category,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiResponse({ status: 200, description: 'Category updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const category = await this.categoryService.update(id, dto);

    return {
      success: true,
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);

    return {
      success: true,
      message: 'Category deleted successfully',
    };
  }
}
