package com.example.bil372.service.impl;

import com.example.bil372.dto.request.MenuItemRequest;
import com.example.bil372.dto.response.MenuCategoryResponse;
import com.example.bil372.dto.response.MenuItemResponse;
import com.example.bil372.model.*;
import com.example.bil372.repository.*;
import com.example.bil372.service.IMenuService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuService implements IMenuService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    private MenuItemResponse menuItemResponseCreator(Item item) {
        return MenuItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .price(item.getPrice())
                .description(item.getDescription())
                .imageUrl(item.getImageUrl())
                .categoryId(item.getCategory().getId())
                .categoryName(item.getCategory().getName())
                .build();
    }
    private MenuCategoryResponse menuCategoryResponseCreator(Category category) {
        List<MenuItemResponse> itemResponseList =
                category.getItems() != null ?
                        category.getItems().stream()
                                .map(this::menuItemResponseCreator)
                                .collect(Collectors.toList())
                        : List.of();
        return MenuCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .itemCount(category.getItems() != null ? category.getItems().size() : 0)
                .items(itemResponseList)
                .build();
    }

    @Override
    public List<MenuCategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::menuCategoryResponseCreator)
                .collect(Collectors.toList());
    }

    @Override
    public MenuCategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found! ID: "+ id));
        return menuCategoryResponseCreator(category);
    }

    @Override
    @Transactional
    public MenuItemResponse createItem(MenuItemRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found! ID: " + request.getCategoryId()));

        Item newItem = Item.builder()
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .category(category)
                .build();

        Item savedItem = itemRepository.save(newItem);
        return menuItemResponseCreator(savedItem);
    }

    @Override
    public MenuItemResponse getItemById(Long category_id,Long item_id) {
        Item item = itemRepository.findById(item_id)
                .orElseThrow(() -> new RuntimeException("Item not found! ID: " + item_id));

        if (!item.getCategory().getId().equals(category_id)) {
            throw new RuntimeException("Item ID: " + item_id + " is not under Category ID: " + category_id);
        }

        return menuItemResponseCreator(item);
    }

    @Override
    @Transactional
    public MenuItemResponse updateItem(Long id, MenuItemRequest request) {
        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found! ID: " + id));

        if (!existingItem.getCategory().getId().equals(request.getCategoryId())) {
            Category newCategory = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("New Category not found! ID: " + request.getCategoryId()));
            existingItem.setCategory(newCategory);
        }

        existingItem.setName(request.getName());
        existingItem.setPrice(request.getPrice());
        existingItem.setDescription(request.getDescription());
        existingItem.setImageUrl(request.getImageUrl());

        Item updatedItem = itemRepository.save(existingItem);
        return menuItemResponseCreator(updatedItem);
    }

    @Override
    @Transactional
    public void deleteItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found! ID: " + id));

        itemRepository.delete(item);
    }
}
