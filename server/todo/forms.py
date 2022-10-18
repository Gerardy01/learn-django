from django import forms



class RawTodoListFrom(forms.Form):
    title = forms.CharField()
    description = forms.CharField()