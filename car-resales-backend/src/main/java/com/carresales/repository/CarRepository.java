package com.carresales.repository;

import com.carresales.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CarRepository extends MongoRepository<Car, String> {
    
    List<Car> findByMakeContainingIgnoreCase(String make);
    
    List<Car> findByCondition(String condition);
    
    List<Car> findByYearBetween(Integer startYear, Integer endYear);
    
    @Query("{ 'make': { $regex: ?0, $options: 'i' } }")
    List<Car> searchByMake(String make);
    
    List<Car> findByPriceLessThanEqual(java.math.BigDecimal maxPrice);
    
    List<Car> findByMileageLessThanEqual(Integer maxMileage);
}