from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class BookshelfForm(FlaskForm):
    bookshelf_name = StringField("Bookshelf Name", validators=[Length(
        max=35), DataRequired()])
