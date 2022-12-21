from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, Optional, URL

class BookForm(FlaskForm):
    title = StringField("Title", validators=[Length(
        max=250), DataRequired()])
    genre = StringField("Genre", validators=[Length(
        max=100), DataRequired()])
    summary = TextAreaField("Summary", validators=[Length(
        max=1500), Optional()])
    coverImageURL = StringField(
        "Cover Image URL", validators=[URL(), Optional()])
