swagger: "2.0"
info:
  version: "1.0.0"
  title: Restaurant API
paths:
  /register:
    post:
      summary: Allows users to register
      responses:
        "201":
          description: Registration successful
        default:
          description: Error occurred
  /login:
    post:
      summary: Allows users to log in
      responses:
        "201":
          description: User logged in successfully
        "400":
          description: No user found or wrong password
        default:
          description: Error occurred
  /user/{id}/reset:
    patch:
      summary: Allows users to reset their password
      parameters:
        - name: id
          in: path
          description: User ID
          required: true
          type: string
        - name: old_pass
          in: body
          description: Old password
          required: true
          schema:
            type: object
            properties:
              old_pass:
                type: string
        - name: password
          in: body
          description: New password
          required: true
          schema:
            type: object
            properties:
              password:
                type: string
      responses:
        "201":
          description: Password updated successfully
        "400":
          description: No user found or wrong password
        default:
          description: Error occurred
  /orders:
    post:
      summary: Allows users to place an order
      parameters:
        - name: body
          in: body
          description: Order details
          required: true
          schema:
            type: object
            properties:
              id:
                type: string
              restaurantID:
                type: string
              user:
                type: string
              restaurant:
                type: string
              items:
                type: array
                items:
                  type: object
              totalPrice:
                type: number
              deliveryAddress:
                type: string
              status:
                type: string
      responses:
        "201":
          description: Order placed successfully
        "500":
          description: Internal server error
  /orders/{id}:
    get:
      summary: Returns the details of a specific order
      parameters:
        - name: id
          in: path
          description: Order ID
          required: true
          type: string
      responses:
        "200":
          description: Order details retrieved successfully
        "500":
          description: Internal server error
  /orders/:{id}:
    patch:
      summary: Allows users to update the status of a specific order
      parameters:
        - name: id
          in: path
          description: Order ID
          required: true
          type: string
        - name: body
          in: body
          description: Updated status
          required: true
          schema:
            type: object
            properties:
              status:
                type: string
      responses:
        "200":
          description: Status updated successfully
        "500":
          description: Internal server error
  /restaurant:
    post:
      summary: Allows users to add a new restaurant
      parameters:
        - name: body
          in: body
          description: Restaurant details
          required: true
          schema:
            type: object
            properties:
              name:
                type: string
              address:
                type: object
                properties:
                  street:
                    type: string
                  city:
                    type: string
                  state:
                    type: string
                  country:
                    type: string
                  zip:
                    type: string
      responses:
        "200":
          description: Restaurant added successfully
        "500":
          description: Internal server error
  /restaurants:
    get:
      summary: Returns a list of all available restaurants
      responses:
        "200":
          description: List of restaurants retrieved successfully
        "500":
          description: Internal server error
  /restaurants/{id}:
    get:
      summary: Returns the details of a specific restaurant
      parameters:
        - name: id
          in: path
          description: Restaurant ID
          required: true
          type: string
      responses:
        "200":
          description: Restaurant details retrieved successfully
        "500":
          description: Internal server error
  /restaurants/{id}/menu:
    get:
      summary: Returns the menu of a specific restaurant
      parameters:
        - name: id
          in: path
          description: Restaurant ID
          required: true
          type: string
      responses:
        "200":
          description: Menu retrieved successfully
        "404":
          description: Restaurant not found
        "500":
          description: Internal server error
    post:
      summary: Allows users to add a new item to a specific restaurant's menu
      parameters:
        - name: id
          in: path
          description: Restaurant ID
          required: true
          type: string
        - name: body
          in: body
          description: Menu item details
          required: true
          schema:
            type: object
            properties:
              name:
                type: string
              description:
                type: string
              price:
                type: number
              image:
                type: string
      responses:
        "201":
          description: Menu item added successfully
        "500":
          description: Internal server error
  /restaurants/{id}/menu/{menuid}:
    delete:
      summary: Allows users to delete a particular menu item from a specific restaurant
      parameters:
        - name: id
          in: path
          description: Restaurant ID
          required: true
          type: string
        - name: menuid
          in: path
          description: Menu item ID
          required: true
          type: string
      responses:
        "200":
          description: Menu item deleted successfully
        "500":
          description: Internal server error
