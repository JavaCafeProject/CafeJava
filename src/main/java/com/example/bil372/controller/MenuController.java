package com.example.bil372.controller;

import com.example.bil372.dto.response.CategoryResponse;
import com.example.bil372.dto.response.ItemResponse;
import com.example.bil372.model.Category;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/menu")
public class MenuController {

    private IMenuService menuService;

    @GetMapping("/categories")
    public List<CategoryResponse> getCategories() {
        return menuService.getCategories();
    }

    @GetMapping("/categories/{id}")
    public CategoryResponse getCategoryById(@PathVariable Long id) {
        return menuService.getCategoriesById(id);
    }

    @GetMapping("/categories/{category_id}/item/{item_id}")
    public ItemResponse getItemById (@PathVariable Long category_id, @PathVariable Long item_id) {
        return menuService.getItemById(category_id, item_id);
    }
}
