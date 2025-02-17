import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product/product.service';
import {Product} from "../../model/interface/Product";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  searchTerm: string = '';
  // searchId: number | null = null;
  product: any = null;
  newProduct: Product = {
    id: 0,
    title: '',
    price: null,
    description: '',
    categoryId: 1,
    images: ['https://placeimg.com/640/480/any'],
  };
  filteredProducts: any[] = [];
  showAddProductModal = false;
  showEditProductModal = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products]; // Reset if empty
      return;
    }

    const id = parseInt(this.searchTerm, 10);
    if (isNaN(id)) {
      console.warn('Invalid search query'); // Debugging
      return;
    }

    this.filteredProducts = this.products.filter(p => p.id === id);
  }

  openAddProductModal() {
    this.showAddProductModal = true;
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
  }

  showUpdateProductModal(product: any):void {
    console.log("Opening edit modal for:", product);
    this.newProduct = { ...product }; // Store the selected product
    this.showEditProductModal = true;
  }

  closeUpdateProductModal(): void {
    console.log("Closing edit modal...");
    this.showEditProductModal = false;
  }

  onAddProduct() {
    if (
      this.newProduct.title &&
      this.newProduct.price !== null &&
      this.newProduct.description
    ) {
      // Send the product data to the API
      this.productService.addProduct(this.newProduct).subscribe({
        next: (response) => {
          this.loadProducts(); // Reload the product list after adding
          this.closeAddProductModal(); // Close modal after adding
        },
        error: (err) => {
          console.error('Error adding product', err);
        }
      });
    } else {
      console.error('Invalid product data:', this.newProduct);
    }
  }

  onUpdate(): void {
    console.log("Updating product:", this.newProduct); // Debugging step

    const updatedProduct = { ...this.newProduct };
    console.log(updatedProduct.id);

    this.productService.updateProduct(updatedProduct.id, updatedProduct).subscribe(() => {
      this.loadProducts();
      this.closeUpdateProductModal();
    });
  }

  onDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    })
  }
}
