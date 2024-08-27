package com.productos.crud_products.service.impl

import com.productos.crud_products.commons.GenericServiceImpl
import com.productos.crud_products.model.Productos
import com.productos.crud_products.repository.ProductoRepository
import com.productos.crud_products.service.api.ProductoServiceAPI
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Service

@Service
class ProductoServiceImpl : GenericServiceImpl<Productos, Int> (), ProductoServiceAPI{
    @Autowired
    lateinit var productoRepository: ProductoRepository
    override fun getDao(): CrudRepository<Productos, Int> {
        return productoRepository
    }
}