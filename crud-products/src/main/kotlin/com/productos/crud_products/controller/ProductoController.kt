package com.productos.crud_products.controller

import com.productos.crud_products.model.Productos
import com.productos.crud_products.service.api.ProductoServiceAPI
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import kotlin.reflect.jvm.internal.impl.descriptors.deserialization.PlatformDependentDeclarationFilter.All

@RestController
@RequestMapping("/api/productos")
@CrossOrigin("*")
class ProductoController {
    @Autowired
    lateinit var productoServiceAPI: ProductoServiceAPI

    @GetMapping("/all")
    fun getAll(): List<Productos>? {
        return productoServiceAPI.all
    }
    @PostMapping("/save")
    fun save(@RequestBody producto: Productos):ResponseEntity<Productos>{
        var obj = productoServiceAPI.save(producto)
        return ResponseEntity<Productos>(producto, HttpStatus.OK)
    }
    @GetMapping("/delete/{id}")
    fun delete(@PathVariable id:Int):ResponseEntity<Productos>{
        val producto = productoServiceAPI.get(id)
        if(producto != null){
            productoServiceAPI.delete(id)
        }
        else{
            return ResponseEntity<Productos>(HttpStatus.NO_CONTENT)
        }
        return ResponseEntity<Productos>(producto, HttpStatus.OK)
    }
}