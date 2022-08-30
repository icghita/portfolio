"""Add subtitle

Revision ID: 348b9d2ee57e
Revises: 240b7aab707a
Create Date: 2022-08-17 10:29:40.666007

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '348b9d2ee57e'
down_revision = '240b7aab707a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Contents', sa.Column('title', sa.String(), nullable=True))
    op.create_index(op.f('ix_Contents_title'), 'Contents', ['title'], unique=False)
    op.add_column('Items', sa.Column('subtitle', sa.String(), nullable=True))
    op.create_index(op.f('ix_Items_subtitle'), 'Items', ['subtitle'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_Items_subtitle'), table_name='Items')
    op.drop_column('Items', 'subtitle')
    op.drop_index(op.f('ix_Contents_title'), table_name='Contents')
    op.drop_column('Contents', 'title')
    # ### end Alembic commands ###