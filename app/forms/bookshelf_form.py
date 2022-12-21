from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class BookshelfForm(FlaskForm):
    bookshelfName = StringField("Bookshelf Name", validators=[Length(
        max=35), DataRequired()])
