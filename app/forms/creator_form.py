from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Length, Optional, URL


# Selection options for post type:
role_type_list = ["author", "illustrator", "translator"]


class CreatorForm(FlaskForm):
    role_type_list = SelectField("Role", validators=[
        DataRequired()], choices=role_type_list)
    name  = StringField("Name", validators=[Length(
        max=200), DataRequired()])
    creator_image_url = StringField(
        "Creator Image URL", validators=[URL(), Optional()])
    creator_summary = TextAreaField("Text", validators=[Length(
        max=1500), Optional()])
