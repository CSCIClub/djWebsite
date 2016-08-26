from django import template

register = template.Library()

@register.inclusion_tag('navbar/navbar.html')
def show_navbar():
    new_Dict = dict()
    return {'new_Dict': new_Dict}
