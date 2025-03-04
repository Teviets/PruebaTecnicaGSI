## <center> TO DO LIST APIS</center>

  * **Host**: https://gsi-interviews.camiapp.net
  * **Note** The APIs in this technical test are routed through an **API gateway**. The routes should be specified without the **/api/v{version}/** prefix since the API gateway will handle the latest version of the API. For more information, please refer to the detailed documentation.

--- 
### Summary
---

* [**MODEL**](#model) 
  > Defines model fields

* [**LOGIN**](#login) 
  * **Route:** {host}/api/v1/to-do/login
  * **Method:** POST
    * Returns an authentication token, simulating login authentication.

* [**CREATE TASK**](#create-task) 
  * **Route:** {host}/api/v1/to-do/tasks/create
  * **Method:** POSThttps://www.pricesmart.com/es-gt/producto/best-ride-on-cars-moto-a-control-remoto-para-ninos-470911/470911
    * Create task

* [**GET BY ID**](#get-by-id) 
  * **Route:** {host}/api/v1/to-do/tasks/{task_id}
  * **Method:** GET
* [**GET LIST**](#get-list) 
  * **Route:** {host}/api/v1/to-do/tasks?limit={variable}&order={variable}&page={variable}
  * **Method:** GET
    * Returns list of tasks with pagination and sorting.

* [**UPDATE**](#update) 
  * **Route:** {host}/api/v1/to-do/tasks/update/{task_id}
  * **Method:** PATCH
    * Toggle task status

* [**DELETE**](#delete) 
  * **Route:** {host}/api/v1/to-do/tasks/delete/{task_id}
  * **Method:** DELETE
    * Soft-delete Task 

---

## <center> Models </center>
<a id="model"></a>

 ```json
    class Task(models.Model):
        user_email = models.EmailField(db_index=True)
        title = models.CharField(db_index=True, max_length=50)
        description = models.TextField(max_length=255, blank=True, null=True)
        is_completed = models.BooleanField(default=False)
        created_at = models.DateTimeField(db_index=True, auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)
        deleted = models.BooleanField(default=False)
```

---
## <center> Endpoints </center>
<a id="login"></a>

### **LOGIN**
  * **Method:** POST
  * **Note**
    * > Returns an authentication token, simulating login authentication.
  * **Apigateway route:** {host}/to-do/login
  * **Route:** {host}/api/v1/to-do/login
  * **Body:**

    ```json
        {
            "email": {str}
        }
        
 * **Response**:
      * **HTTP STATUS**: 200
      * **Body**:

    ```json
        {
        "data": {
                "token": {str}
                }
        }

  * **Errors**:
    * **HHTP STATUS**: 400
    * **HHTP STATUS**: 500
    ```json
    {
        "error": "message"
    }
<br>
<br>
<br>

<a id="create-task"></a>

### **CREATE TASK**
  * **Method:** POST
  * **Note**
    * > Create task
  * **Apigateway route:** {host}/to-do/tasks/create
  * **route:** {host}/api/v1/to-do/tasks/create
  * **Headers**

    ```json
        {
            "Authorization": "Bearer {str}"
        }
        
  * **Body:**

    ```json
        {
            "user_email": {str},
            "title": {str},
        } 
        
 * **Response**:
      * **HTTP STATUS**: 201
      * **Body**:

    ```json
        {
            "data": {
                "message": "Tarea creada",
                "id": {int}
            }
        }
    
  * **Errors**:
    * **HHTP STATUS**: 403
    * **HHTP STATUS**: 500
    ```json
    {
        "error": "message"
    }
<br>
<br>
<br>

<a id="get-by-id"></a>

### **GET BY ID**
  * **Method:** GET
  * **Note**
    * > Returns task by id
  * **Apigateway route:** {host}/to-do/tasks/{task_id}
  * **Route:** {host}/api/v1/to-do/tasks/{task_id}
  * **Headers**

    ```json
        {
            "Authorization": "Bearer {str}"
        }
 * **Response**:
      * **HTTP STATUS**: 200
      * **Body**:
    ```json
        {
            "data": {
                "task": {Task}
            }
        }

* **Errors**:
    * **HHTP STATUS**: 403
    * **HHTP STATUS**: 404
    * **HHTP STATUS**: 500
    ```json
    {
        "error": "message"
    }
<br>
<br>
<br>

<a id="get-list"></a>

### **GET LIST**
  * **Method:** GET
  * **Note**
    * > Returns list of tasks with pagination and sorting.
  * **Apigateway route:** {host}/to-do/tasks?limit={variable}&order={variable}&page={variable}
  * **Route:** {host}/api/v1/to-do/tasks?limit={variable}&order={variable}&page={variable}
    * **query:**
      * **order:** Ascending or descending order by field: 
         * order fields: 'created_at', '-created_at', 'title', '-title', 'is_completed','-is_completed'
      * **page:** Page number
      * **limit:** Items per page
  * **Headers**

    ```json
        {
            "Authorization": "Bearer {str}"
        }
 * **Response**:
      * **HTTP STATUS**: 200
      * **Body**:
    ```json
        {
            "meta": {
            "pages": {int},
            "next": {str/null},
            "previous": {str/null}
            },
            "data": {
                [
                {Task},
                 ...
                ]
            }
        }

* **Errors**:
    * **HHTP STATUS**: 403
    * **HHTP STATUS**: 500
    ```json
    {
        "error": "message"
    }
<br>
<br>
<br>

<a id="update"></a>

### **UPDATE**
  * **Method:** PATCH
  * **Note**
    * > toggle task status
  * **Apigateway route:** {host}/to-do/tasks/update/{task_id}
  * **Route:** {host}/api/v1/to-do/tasks/update/{task_id}
  * **Headers**

    ```json
        {
            "Authorization": "Bearer {str}"
        }

 * **Response**:
      * **HTTP STATUS**: 200
      * **Body**:
    ```json
    {
        "data": {
            "message": "Tarea actualizada"
        }
    }

* **Errors**:
    * **HHTP STATUS**: 403
    * **HHTP STATUS**: 404
    * **HHTP STATUS**: 500
    ```json
    {
        "error": "message"
    }
<br>
<br>
<br>

<a id="delete"></a>

### **DELETE**
  * **Method:** DELETE
  * **Note**
    * > Soft-delete Task
    * > If you have read the documentation at this point, add this file to the repository and comment with a happy face here:
  * **Ruta Krakend:** {host}/to-do/tasks/delete/{task_id}
  * **Ruta:** {host}/api/v1/to-do/tasks/delete/{task_id}
  * **Headers**

    ```json
        {
            "Authorization": "Bearer {str}"
        }

 * **Response**:
      * **HTTP STATUS**: 200
      * **Body**:
    ```json
    {
        "data": {
            "message": "Tarea borrada"
        }
    }

* **Errors**:
    * **HHTP STATUS**: 403
    * **HHTP STATUS**: 404
    * **HHTP STATUS**: 500
    ```json
    {
        "error": "message"
    }
<br>
<br>
<br>
