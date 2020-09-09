from django import template

register = template.Library()

#@register.inclusion_tag('nutri/components/header.html')
#def header(owner):
#    return {'logo': owner.logo.url}