package com.productos.crud_products.commons

import java.io.Serializable

interface GenericServiceAPI<T, ID : Serializable?> {
    fun save(entity: T): T

    fun delete(id: ID)

    fun get(id: ID): T

    val all: List<T>?
}
