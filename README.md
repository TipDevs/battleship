# 🚢 Battleship Game

A classic **Battleship game** implemented in JavaScript with **Webpack** and **Babel**.  
Built with a **Test-Driven Development (TDD)** approach using **Jest** to ensure reliable, modular game logic.

## 🎮 Features
- Place ships, take turns, attack enemy coordinates
- Computer opponent that makes random valid moves
- Win detection when all ships are sunk
- Separation of **game logic** (tested) and **UI rendering**

---

## 🎯 Learning Goals
- Practice **Test-Driven Development (TDD)** in a real project
- Structure applications with **modular JavaScript**
- Apply **OOP/factory functions** for game entities
- Separate **business logic** from **DOM rendering**
- Gain experience in **Webpack + Babel project setup**

---

## 🧪 Testing
- All core logic is tested with **Jest**
- Only the **public interface** of each module is tested
- **DOM/UI is excluded from testing** — focus is on game rules
- Tests cover:
  - `Ship` → hit tracking & sunk detection
  - `Gameboard` → ship placement, attacks, misses, win condition
  - `Player` → human vs computer moves
  - `Controller` → game flow