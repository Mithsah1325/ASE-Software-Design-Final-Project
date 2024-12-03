# Fitness Tracker App

## Overview  
The **Fitness Tracker** is a **web-based application** designed to help users record, monitor, and analyze their workout activities. It leverages **object-oriented programming (OOP)** principles and a **MongoDB database** for backend operations, with a focus on **clean architecture** and **design patterns** to deliver an efficient and user-friendly experience.

---

## Features  

### 1. **Workout Management**  
- Log and track various workout activities.  
- Edit, delete, and view workout history.  

### 2. **Goal Setting and Monitoring**  
- Define weekly or custom fitness goals.  
- Track progress with notifications.  

### 3. **Analytics and Reporting**  
- Visualize progress through interactive charts.  
- Export data in different formats for further analysis.

---

## Application Demo  

### Workout Management Example:  
![Workout Management UI](https://res.cloudinary.com/dhrv9fkdo/image/upload/v1733255844/1111_unecjq.png))

### Analytics Dashboard:  
![Analytics Dashboard](https://res.cloudinary.com/dhrv9fkdo/image/upload/v1733255852/11111111_jbvy2y.png)

---

## Problem Domain  

Many users struggle to maintain consistent fitness routines or lack insight into their progress. This application bridges the gap by offering:  
1. Goal-tracking mechanisms to stay motivated.  
2. Comprehensive analytics for informed decision-making.  
3. Notifications to help users stay consistent.

---

## Requirements  

### User Stories  

#### **Epic 1: Workout Management**  
- Record workouts.  
- Edit and delete entries.  
- View detailed workout history.  

#### **Epic 2: Goal Setting and Monitoring**  
- Set and monitor fitness goals.  
- Weekly workout tracking.  
- Notifications for approaching deadlines.  

#### **Epic 3: Analytics and Reporting**  
- Analyze fitness data.  
- Export workout data.  
- View statistics on workout preferences.

---

## Initial Class Structure  

| Class Name          | Responsibility                       |  
|---------------------|-------------------------------------|  
| **WorkoutManager**  | CRUD operations for workouts         |  
| **GoalTracker**     | Goal management and progress tracking|  
| **DataAnalyzer**    | Fitness data analysis and insights   |  
| **ExportManager**   | Data export functionality            |  
| **NotificationService** | Notification handling for goals   |  
| **DatabaseConnector** | Backend database operations        |  

---

## Implementation Plan  

| Phase         | Features                                 |  
|---------------|------------------------------------------|  
| **Phase 1**   | Basic workout logging, database setup    |  
| **Phase 2**   | Complete management, goal setting, charts|  
| **Phase 3**   | Advanced analytics, reporting, UI updates|  

---

## Design Patterns  

### 1. Singleton Pattern:  
Used for **Database Manager** to handle essential data operations efficiently.  

### 2. Factory Method Pattern:  
Implemented for **Workout Creation** to streamline the addition of new workout types.  

### 3. Builder Pattern:  
Employed for **Report Generation** to allow dynamic and complex reporting.  

---

## Project Structure  



---

## Technology Stack  

| **Category**        | **Technology**                      |  
|---------------------|-------------------------------------|  
| **Frontend**        | React.js, Tailwind CSS             |  
| **Backend**         | Node.js, Express.js                |  
| **Database**        | MongoDB                            |  
| **Analytics**       | Chart.js                           |  
| **Tools**           | NPM, Git                           |  

---

## Getting Started  

### Prerequisites  
- Node.js  
- MongoDB  

### Installation  
```bash
# Clone the repository
git clone https://github.com/your-username/fitness-tracker

# Navigate to backend and install dependencies
cd fitness-tracker/backend
npm install

# Navigate to frontend and install dependencies
cd ../frontend
npm install
