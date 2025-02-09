from django.db import models



class AIModule(models.Model):
    id = models.AutoField(primary_key=True)
    avatarId = models.CharField(max_length=255)
    knowledgeId = models.CharField(max_length=255,default="4f40877e1ed34c768b9fcaa305be68df")
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    system = models.TextField()
    reportSystem = models.TextField(default="")
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    profileImg = models.URLField(default="")
    
    def __str__(self):
        return self.name


class User(models.Model):
    # firebase user id
    id = models.AutoField(primary_key=True)
    uid = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    avatar = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
# Create a session model to store the conversation history
class Session(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.CharField(max_length=255)
    conversation = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    recordings = models.FileField(upload_to='recordings/', null=True, blank=True)
    report = models.TextField(default="")
    isReported = models.BooleanField(default=False)
    module = models.ForeignKey(AIModule, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.uuid + " - " + self.user.name + " - " + self.module.name) 

