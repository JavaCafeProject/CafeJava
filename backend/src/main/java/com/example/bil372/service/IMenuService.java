package com.example.bil372.service;

import com.example.bil372.dto.request.MenuItemRequest;
import com.example.bil372.dto.response.MenuCategoryResponse;
import com.example.bil372.dto.response.MenuItemResponse;

import java.util.List;

public interface IMenuService {

    public List<MenuCategoryResponse> getAllCategories();
    public MenuCategoryResponse getCategoryById(Long id);

    public MenuItemResponse createItem(MenuItemRequest request);
    public MenuItemResponse getItemById(Long category_id,Long item_id);
    public MenuItemResponse updateItem(Long id, MenuItemRequest request);
    public void deleteItem(Long id);
}
