#
# Copyright (c) 2015-2019 Thierry Florac <tflorac AT ulthar.net>
# All Rights Reserved.
#
# This software is subject to the provisions of the Zope Public License,
# Version 2.1 (ZPL).  A copy of the ZPL should accompany this distribution.
# THIS SOFTWARE IS PROVIDED "AS IS" AND ANY AND ALL EXPRESS OR IMPLIED
# WARRANTIES ARE DISCLAIMED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF TITLE, MERCHANTABILITY, AGAINST INFRINGEMENT, AND FITNESS
# FOR A PARTICULAR PURPOSE.
#

"""PyAMS content themes package

PyAMS sample themes
"""

__docformat__ = 'restructuredtext'

import os

from fanstatic import Library, Resource
from pkg_resources import Requirement, resource_filename
from pyramid.i18n import TranslationStringFactory


_ = TranslationStringFactory('pyams_content_themes')


#
# PyAMS themes resources
#

pkg_dir = resource_filename(Requirement.parse('pyams_content_themes'), 'pkg')
if not os.path.exists(pkg_dir):
    pkg_dir = '../../pkg'  # fallback for source installation


library = Library('pyams', pkg_dir)

pyams_default_theme = Resource(library, 'js/dev/pyams.js',
                               minified='js/dist/pyams.js',
                               depends=(),
                               bottom=False)

pyams_almond_theme = Resource(library, 'js/dev/pyams-almond.js',
                              minified='js/dist/pyams-almond.js',
                              depends=(),
                              bottom=False)

pyams_darkgreen_theme = Resource(library, 'js/dev/pyams-darkgreen.js',
                                 minified='js/dist/pyams-darkgreen.js',
                                 depends=(),
                                 bottom=False)


def includeme(config):
    """pyams_content_themes features include"""
    from .include import include_package  # pylint: disable=import-outside-toplevel
    include_package(config)
