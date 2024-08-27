package com.productos.crud_products.model

import jakarta.persistence.*

@Entity(name = "productos")
data class Productos(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val productoId: Int? = null, // Nullable because it will be auto-generated (SERIAL)
    @Column
    val nombre: String,
    @Column
    val descripcion: String? = null, // Nullable in case description is optional
    @Column
    val precio: Double,
    @Column
    val stock: Int
)