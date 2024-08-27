package com.productos.crud_products.repository

import com.productos.crud_products.model.Productos
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductoRepository : CrudRepository<Productos, Int>{
}