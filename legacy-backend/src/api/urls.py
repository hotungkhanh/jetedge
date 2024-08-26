from rest_framework.routers import DefaultRouter
from campuses.api.urls import campus_router
from django.urls import path, include

router = DefaultRouter()
# one per app
# campuses
router.registry.extend(campus_router.registry)

# courses

# units 

# etc...


urlpatterns = [
    # main path
    path('', include(router.urls)),
]