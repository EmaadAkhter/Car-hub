package com.carresales.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;

@Document(collection = "cars")
public class Car {
    
    @Id
    private String id;
    
    private String make;
    private String model;
    private Integer year;
    private BigDecimal price;
    private Integer mileage;
    private String condition;
    private String transmission;
    private String fuelType;
    private String color;
    private String description;
    private String imageUrl;
    
    // Default constructor
    public Car() {}
    
    // Constructor with parameters
    public Car(String make, String model, Integer year, BigDecimal price, 
               Integer mileage, String condition, String transmission, 
               String fuelType, String color, String description, String imageUrl) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.price = price;
        this.mileage = mileage;
        this.condition = condition;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.color = color;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    
    // Getters and Setters
    public String getId() { 
        return id; 
    }
    
    public void setId(String id) { 
        this.id = id; 
    }
    
    public String getMake() { 
        return make; 
    }
    
    public void setMake(String make) { 
        this.make = make; 
    }
    
    public String getModel() { 
        return model; 
    }
    
    public void setModel(String model) { 
        this.model = model; 
    }
    
    public Integer getYear() { 
        return year; 
    }
    
    public void setYear(Integer year) { 
        this.year = year; 
    }
    
    public BigDecimal getPrice() { 
        return price; 
    }
    
    public void setPrice(BigDecimal price) { 
        this.price = price; 
    }
    
    public Integer getMileage() { 
        return mileage; 
    }
    
    public void setMileage(Integer mileage) { 
        this.mileage = mileage; 
    }
    
    public String getCondition() { 
        return condition; 
    }
    
    public void setCondition(String condition) { 
        this.condition = condition; 
    }
    
    public String getTransmission() { 
        return transmission; 
    }
    
    public void setTransmission(String transmission) { 
        this.transmission = transmission; 
    }
    
    public String getFuelType() { 
        return fuelType; 
    }
    
    public void setFuelType(String fuelType) { 
        this.fuelType = fuelType; 
    }
    
    public String getColor() { 
        return color; 
    }
    
    public void setColor(String color) { 
        this.color = color; 
    }
    
    public String getDescription() { 
        return description; 
    }
    
    public void setDescription(String description) { 
        this.description = description; 
    }
    
    public String getImageUrl() { 
        return imageUrl; 
    }
    
    public void setImageUrl(String imageUrl) { 
        this.imageUrl = imageUrl; 
    }
}