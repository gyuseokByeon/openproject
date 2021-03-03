#-- copyright
# OpenProject is an open source project management software.
# Copyright (C) 2012-2021 the OpenProject GmbH
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License version 3.
#
# OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
# Copyright (C) 2006-2013 Jean-Philippe Lang
# Copyright (C) 2010-2013 the ChiliProject Team
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See docs/COPYRIGHT.rdoc for more details.
#++
require_relative '../common/modal'
require_relative '../ng_select_autocomplete_helpers'

module Components
  module Users
    class InviteUserModal < ::Components::Common::Modal
      include ::Components::NgSelectAutocompleteHelpers

      attr_accessor :project, :principal, :role, :invite_message

      def initialize(project:, principal:, role:, invite_message: 'Welcome!')
        self.project = project
        self.principal = principal
        self.role = role
        self.invite_message = invite_message

        super()
      end

      def run_all_steps
        expect_open

        # STEP 1: Project and type
        project_step

        # STEP 2: User name
        principal_step

        # STEP 3: Role name
        role_step

        # STEP 4: Invite message
        invitation_step

        # STEP 5: Confirmation screen
        confirmation_step

        # Step 6: Perform invite
        click_modal_button 'Send Invitation'

        if invite_user?
          expect_text "Invite #{principal.mail} to #{project.name}"
        else
          expect_text "#{principal_name} was invited!"
        end

        text =
          case principal
          when User
            "The user can now log in to access #{project.name}"
          when PlaceholderUser
            "The placeholder can be used in #{project.name}"
          when Group
            "The group is now a part of #{project.name}"
          else
            raise ArgumentError, "Wrong type"
          end

        expect_text text

        # Close
        click_modal_button 'Continue'
        expect_closed
      end

      def project_step(next_step: true)
        expect_title 'Invite user'
        autocomplete project.name
        select_type type

        click_next if next_step
      end

      def principal_step(next_step: true)
        if invite_user?
          autocomplete principal_name, select_text: "Invite: #{principal_name}"
        else
          autocomplete principal_name
        end

        click_next if next_step
      end

      def role_step(next_step: true)
        autocomplete role.name

        click_next if next_step
      end

      def invitation_step(next_step: true)
        invitation_message invite_message
        click_modal_button 'Review Invitation'
      end

      def confirmation_step
        within_modal do
          expect(page).to have_text project.name
          expect(page).to have_text principal_name
          expect(page).to have_text role.name
          expect(page).to have_text invite_message
        end
      end

      def autocomplete(query, select_text: query)
        select_autocomplete modal_element.find('.ng-select-container'),
                            query: query,
                            select_text: select_text,
                            results_selector: 'body'
      end

      def select_type(type)
        within_modal do
          page.find('.op-option-list--item', text: type).click
        end
      end

      def click_next
        click_modal_button 'Next'
      end

      def invitation_message(text)
        within_modal do
          find('textarea').set text
        end
      end

      def invite_user?
        principal.invited?
      end

      def principal_name
        if invite_user?
          principal.mail
        else
          principal.name
        end
      end

      def type
        principal.class.name
      end
    end
  end
end
