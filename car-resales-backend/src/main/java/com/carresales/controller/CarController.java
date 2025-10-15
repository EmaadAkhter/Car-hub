package com.carresales.controller;

import com.carresales.model.Car;
import com.carresales.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {
    
    @Autowired
    private CarService carService;
    
    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable String id) {
        return carService.getCarById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Car> createCar(@RequestBody Car car) {
        Car savedCar = carService.saveCar(car);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCar);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable String id, @RequestBody Car car) {
        return carService.getCarById(id)
                .map(existingCar -> {
                    car.setId(id);
                    return ResponseEntity.ok(carService.saveCar(car));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable String id) {
        if (carService.getCarById(id).isPresent()) {
            carService.deleteCar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Car>> searchCars(@RequestParam String make) {
        return ResponseEntity.ok(carService.searchByMake(make));
    }
    
    @GetMapping("/filter/condition")
    public ResponseEntity<List<Car>> getCarsByCondition(@RequestParam String condition) {
        return ResponseEntity.ok(carService.findByCondition(condition));
    }
    
    @GetMapping("/filter/year-range")
    public ResponseEntity<List<Car>> getCarsByYearRange(
            @RequestParam Integer startYear,
            @RequestParam Integer endYear) {
        return ResponseEntity.ok(carService.findByYearBetween(startYear, endYear));
    }
    
    @GetMapping("/filter/max-price")
    public ResponseEntity<List<Car>> getCarsByMaxPrice(@RequestParam java.math.BigDecimal maxPrice) {
        return ResponseEntity.ok(carService.findByMaxPrice(maxPrice));
    }
    
    @GetMapping("/filter/max-mileage")
    public ResponseEntity<List<Car>> getCarsByMaxMileage(@RequestParam Integer maxMileage) {
        return ResponseEntity.ok(carService.findByMaxMileage(maxMileage));
    }
}