from flask_wtf import FlaskForm
from wtforms import TextAreaField, DecimalField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    review_text = TextAreaField("Review Text", validators=[Length(
        max=2000), DataRequired()])
    rating = DecimalField("Rating", validators=[DataRequired()])
