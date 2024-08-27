package com.productos.crud_products.commons

import org.springframework.data.repository.CrudRepository
import java.io.Serializable
import java.util.Optional

// Nota: No uses la anotación @Service en una clase abstracta
abstract class GenericServiceImpl<T : Any, ID : Serializable> : GenericServiceAPI<T, ID> {

    protected abstract fun getDao(): CrudRepository<T, ID>

    override fun save(entity: T): T {
        return getDao().save(entity)
    }

    override fun delete(id: ID) {
        getDao().deleteById(id)
    }

    override fun get(id: ID): T {
        val obj: Optional<T> = getDao().findById(id)
        return obj.orElse(null)
    }

    override val all: List<T>
        get() {
            val returnList = mutableListOf<T>()
            getDao().findAll().forEach { obj -> returnList.add(obj) }
            return returnList
        }
}
