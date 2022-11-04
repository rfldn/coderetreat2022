# Your Task
You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet. Develop an API that translates the commands sent from earth to instructions that are understood by the rover.

# Requirements
* You are given the initial starting point (x, y) of a rover and the compass (N, S, E, W) it is facing.
* The rover receives a character array of commands.
* Implement commands that move the rover forward/backward (f, b).
* Implement commands that turn face the rover to a different direction north/south/east/west (n, s, e, w).
* Implement wrapping from one edge of the grid to another. (planets are spheres after all)
* Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.

## Added functionality
I have added more restrictions and features to make it more fun:
* The size of the planet should be parametrized
* The number of obstacles on the planet should be parametrized
* The obstacles should be placed on the planet randomly
* The position on the planet and the obstacles should be represented on console
* The rover should move like a real vehicle where you can also change it's orientation. The movement you choose (forwards, backwards, left or right) will depend on the orientation of the rover.

# Code Retreat Scenario
1. Resolve the Kata without using any modern-software practice as dirty you could
2. Resolve the Kata with Classist TDD, respect the 3 steps
3. Resolve the Kata like in 2, but this time use the TTP as above
4. Clean the Kata in 3, by respecting the 8 rules of Object Calisthenics

## Table of Transformation Priority (TTP)

| #  | TRANSFORMATION               | STARTING CODE    | FINAL CODE                    |
|----|------------------------------|------------------|-------------------------------|
| 1  | {} => nil                    | return nil       |                               |
| 2  | nil => constant              | return nil       | return “1”                    |
| 3  | constant => constant+        | return “1”       | return “1” + “2”              |
| 4  | constant => scalar           | return “1” + “2” | return argument               |
| 5  | statement => statements      | return argument  | return arguments              |
| 6  | unconditional => conditional | return arguments | if(condition)return arguments |
| 7  | scalar => array              | dog              | [dog, cat]                    |
| 8  | array => container           | [dog, cat]       | {dog = “DOG”, cat = “CAT”}    |
| 9  | statement => recursion       | a + b            | a + recursion                 |
| 10 | conditional => loop          | if(condition)    | while(condition)              |
| 11 | recursion => tail recursion  | a + recursion    | recursion                     |
| 12 | expression => function       | today - birthday | CalculateAge()                |
| 13 | variable => mutation         | day              | var day = 10; day = 11;       |
| 14 | switch case                  |                  |                               |

## Object Calisthenics rules
* Only one level of indentation per method
* Don’t use the ELSE keyword
* Wrap all primitives and strings
* First class collections (wrap all collections)
* Only one dot per line dog.Body.Tail.Wag() => dog.ExpressHappiness()
* No abbreviations
* Keep all entities small [10 files per package, 50 lines per class, 5 lines per method, 2 arguments per method]
* No classes with more than two instance variables
* No public getters/setters/properties
