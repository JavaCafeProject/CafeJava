package com.example.bil372.controller;

import com.example.bil372.dto.request.MenuItemRequest;
import com.example.bil372.dto.response.MenuCategoryResponse;
import com.example.bil372.dto.response.MenuItemResponse;
import com.example.bil372.service.IMenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/menu")
public class MenuController {

    private final IMenuService menuService;


    @GetMapping("/categories")
    public List<MenuCategoryResponse> getAllCategories() {
        return menuService.getAllCategories();
    }

    @GetMapping("/categories/{id}")
    public MenuCategoryResponse getCategoryById(@PathVariable Long id) {
        return menuService.getCategoryById(id);
    }

    @GetMapping("/categories/{category_id}/item/{item_id}")
    public MenuItemResponse getItemById (@PathVariable Long category_id, @PathVariable Long item_id) {
        return menuService.getItemById(category_id, item_id);
    }

    @PostMapping("/items")
    public MenuItemResponse createItem(@RequestBody MenuItemRequest request){
        return menuService.createItem(request);
    }

    @PutMapping("/item/{id}")
    public MenuItemResponse updateItem(@PathVariable Long id,@RequestBody MenuItemRequest request){
        return menuService.updateItem(id,request);
    }

    @DeleteMapping("/item/{id}")
    public void deleteItem(@PathVariable Long id){
        menuService.deleteItem(id);
    }
}
