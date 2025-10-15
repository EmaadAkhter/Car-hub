package com.carresales.service;

import com.carresales.model.Car;
import com.carresales.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CarService {
    
    @Autowired
    private CarRepository carRepository;
    
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
    
    public Optional<Car> getCarById(String id) {
        return carRepository.findById(id);
    }
    
    public Car saveCar(Car car) {
        return carRepository.save(car);
    }
    
    public void deleteCar(String id) {
        carRepository.deleteById(id);
    }
    
    public List<Car> searchByMake(String make) {
        return carRepository.findByMakeContainingIgnoreCase(make);
    }
    
    public List<Car> findByCondition(String condition) {
        return carRepository.findByCondition(condition);
    }
    
    public List<Car> findByYearBetween(Integer startYear, Integer endYear) {
        return carRepository.findByYearBetween(startYear, endYear);
    }
    
    public List<Car> findByMaxPrice(java.math.BigDecimal maxPrice) {
        return carRepository.findByPriceLessThanEqual(maxPrice);
    }
    
    public List<Car> findByMaxMileage(Integer maxMileage) {
        return carRepository.findByMileageLessThanEqual(maxMileage);
    }
}