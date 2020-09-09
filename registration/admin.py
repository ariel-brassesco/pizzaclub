from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
#from django.contrib.auth.models import User
from .models import User, Employee, Client

# Register your models here
class EmployeeInline(admin.StackedInline):
    model = Employee
    can_delete = False
    verbose_name_plural = 'employees'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (EmployeeInline,)

# Re-register UserAdmin
#admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Employee)
admin.site.register(Client)

